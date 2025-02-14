import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import puppeteer, { Browser } from 'puppeteer';
import { ProductModel } from '../product/product.model';

@Injectable()
export class ParserService {
  async parseFromKaspiBySearch(query: string): Promise<Pick<ProductModel, 'title' | 'price' | 'images'>[]>
  {
    const searchUrl = `https://kaspi.kz/shop/search/?text=${encodeURIComponent(query)}`;

    try {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });

      await page.waitForSelector('.item-card', { timeout: 10000 });

      const productIds = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.item-card'))
          .map(card => card.getAttribute('data-product-id'))
          .filter(id => id !== null) as string[];
      });

      if (productIds.length === 0) throw new NotFoundException('No products found');

      const results: Pick<ProductModel, 'title' | 'price' | 'images'>[] = [];

      for (const kaspiId of productIds) {
        const productData = await this.parseFromKaspiByProductId(browser, kaspiId);
        if (productData) results.push(productData);
      }

      await browser.close();
      return results;
    } catch (error) {
      throw new InternalServerErrorException(`Error while parsing from Kaspi: ${error.message}`);
    }
  }

  async parseFromKaspiByProductId(browser: Browser, kaspiId: string): Promise<Pick<ProductModel, 'title' | 'price' | 'images'> | null> {
    const url = `https://kaspi.kz/shop/p/c-${kaspiId}`;
    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded' });

      await page.waitForSelector('.item__heading', { timeout: 10000 });
      await page.waitForSelector('.item__price-once', { timeout: 10000 });
      
      const parsedData = await page.evaluate((kaspiId) => {
        const title = document.querySelector('.item__heading')?.textContent?.trim() || '';
        const rawPrice = document.querySelector('.item__price-once')?.textContent || '';
        const images = document.querySelectorAll('.item__slider-thumb-pic');
        const description = document.querySelector('.description p')?.textContent?.trim() || '';

        if (!title || !rawPrice) return null;

        return { 
          id: kaspiId,
          title, 
          price: Number(rawPrice.match(/\d/g)?.join('')) || 0,
          description,
          images: Object.fromEntries(
            Array.from(images).map((img, index) => [index + 1, (img as HTMLImageElement).src])
          )
        };
      }, kaspiId);

      await page.close();

      if (!parsedData) throw new NotFoundException('Product data not found');

      return parsedData;
    } catch (error) {
      throw new InternalServerErrorException(`Error while parsing product ${kaspiId}: ${error.message}`);
    }
  }
}

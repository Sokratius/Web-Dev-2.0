import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { ProductModel } from '../product/product.model';

@Injectable()
export class ParserService {
  async parseFromKaspiByProductId(kaspiId: string): Promise<Pick<ProductModel, 'title' | 'price' | 'images'>> {
    const url = `https://kaspi.kz/shop/p/c-${kaspiId}`;
    try {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto(url);
      const parsedData = await page.evaluate(() => {

        const title = document.querySelector('.item__heading')?.textContent;
        const rawPrice = document.querySelector('.item__price-once')?.textContent;
        const images = document.querySelectorAll('.item__slider-thumb-pic');
        const description = document.querySelector('.description p')?.textContent?.trim() || '';

        
        if (!title || !rawPrice) {
          throw new NotFoundException('PARSING_FROM_KASPI_FAILED');
        }
        return { 
          title, 
          price: Number(rawPrice.match(/\d/g)?.join('')),
          description,
          images: images 
            ? Object.fromEntries(
                Array.from(images).map((img, index) => [index + 1, (img as HTMLImageElement).src])
              )
            : {}
        };
      });
      await browser.close();
      return parsedData;
    } catch (error) {
      throw new InternalServerErrorException('ERROR_WHILE_PARSING_FROM_KASPI');
    }
  }
}
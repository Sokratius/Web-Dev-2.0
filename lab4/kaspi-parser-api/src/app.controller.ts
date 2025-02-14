import { Controller, Get, Param } from '@nestjs/common';
import { KaspiIdDTO } from './common/dto/kaspi-id.dto';
import { ProductModel } from './product/product.model';
import { ProductService } from './product/product.service';
import { ParserService } from './parser/parser2.service';

@Controller()
export class AppController {
  constructor(
    private readonly productService: ProductService,
    private readonly parserService: ParserService
  ) {}

  @Get('parse-search/:query')
  async parseSearch(
    @Param('query') query: string
  ): Promise<Record<number, Pick<ProductModel, 'title' | 'price' | 'images'>>> {
    return this.parserService.parseFromKaspiBySearch(query);
  }

  @Get('parse-product/:kaspiId')
  async parseProduct(
    @Param() { kaspiId }: KaspiIdDTO
  ): Promise<Pick<ProductModel, 'title' | 'price' | 'images'>> {
    const parsedProduct = await this.productService.getInfoFromKaspi(kaspiId);
    await this.productService.saveInfoFromKaspi({ kaspiId, ...parsedProduct });
    return parsedProduct;
  }
}

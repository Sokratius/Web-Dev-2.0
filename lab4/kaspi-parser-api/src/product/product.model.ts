import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { mongoId } from '../common/types';
import { collectionNames } from '../configs/mongo.config';

@Schema({ collection: collectionNames.PRODUCT })
export class ProductModel {
  _id: mongoId;

  @Prop({ required: true })
  id: string;


  @Prop({ required: true })
  title: string;

  // @Prop({ required: true })
  // description: string;

  @Prop()
  price: number;

  @Prop({ required: true, index: true })
  kaspiId: string;

  @Prop()
  createdAt: number;

  @Prop({ type: Object })
  images: Record<string, string>;
}

export type ProductDocument = ProductModel & Document;
export const ProductSchema = SchemaFactory.createForClass(ProductModel);

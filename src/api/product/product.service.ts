import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/entites';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
  CreateProductBody,
  DeleteProductById,
  GetProductById,
  UpdateProdcutBody,
  UpdateProductParam,
} from './product.dto';
import { E } from 'src/common';
import { BaseRepository } from 'src/repositories/base.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productService: BaseRepository<ProductEntity>,
    private readonly em: EntityManager,
  ) {}
  async create(body: CreateProductBody) {
    return this.em.transaction(async (em) => {
      //   const { categoryId } = body;

      //   const category = await em
      //     .getRepository(CategoryEntity)
      //     .findOne(categoryId);
      //   if (!category) throw new BadRequestException('Category not found');

      body['status'] = E.StatusEnum.active;
      const productEntity = Object.assign(new ProductEntity(), {
        ...body,
      });
      const product = await em.getRepository(ProductEntity).save(productEntity);
      productEntity['id'] = product.id;
      return {
        message: 'ok',
      };
    });
  }
  async getAll() {
    return this.em.transaction(async (em) => {
      const result = await em.getRepository(ProductEntity).find();
      return result;
    });
  }
  async findById(param: GetProductById) {
    const { id } = param;

    const product = await this.productService.findOneBy({ id });
    if (!product)
      throw new BadRequestException({
        statusCode: 1140,
        message: 'Product not found!',
      });
    // console.log(dish);
    return { data: product };
  }

  async update(param: UpdateProductParam, body: UpdateProdcutBody) {
    const { id } = param;

    const product = await this.productService.findOneBy({ id });
    if (!product)
      throw new BadRequestException({
        statusCode: 1140,
        message: 'product do not exist',
      });

    await this.productService.update(id, body);
    return { message: 'OK' };
  }

  async delete(param: DeleteProductById) {
    const { id } = param;
    const product = await this.productService.findOneBy({ id });
    if (!product)
      throw new BadRequestException({
        statusCode: 1120,
        message: 'Product not found!!',
      });
    await this.productService.delete(id);
    return { message: 'Success' };
  }
}

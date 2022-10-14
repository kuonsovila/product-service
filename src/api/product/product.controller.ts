import { Controller, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Body, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateProductBody,
  DeleteProductById,
  GetProductById,
  UpdateProdcutBody,
  UpdateProductParam,
} from './product.dto';

@Controller('admin/product')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly service: ProductService) {}
  @ApiOperation({ summary: 'New product' })
  @Post('/new')
  async postProduct(@Body() body: CreateProductBody) {
    const dish = await this.service.create(body);
    return dish;
  }

  @ApiOperation({ summary: 'Find all' })
  @Get('/list')
  async findAll() {
    return await this.service.getAll();
  }

  @ApiOperation({ summary: 'Find product by id' })
  @Get('/detail/:id')
  async findOne(@Param() param: GetProductById) {
    return await this.service.findById(param);
    // return await this.service.getAll();
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'update product' })
  async update(
    @Param() param: UpdateProductParam,
    @Body() body: UpdateProdcutBody,
  ) {
    const id = param;
    const result = await this.service.update(id, body);
    return result;
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'delete product' })
  async delete(@Param() param: DeleteProductById) {
    const id = param;
    const result = await this.service.delete(id);
    return result;
  }
}

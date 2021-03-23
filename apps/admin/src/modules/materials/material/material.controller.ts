import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Response } from "@nestjs/common";
import { ToolsService } from "../../../common/tools/tools.service";
import { Config } from "../../../config/config";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { MaterialService } from "@libs/db/models/materials/material/material.service";
import { MaterialDto } from "@libs/db/models/materials/material/material.dto";

@Controller(`${Config.adminPath}/material`)
@ApiTags('material物料模块')
export class MaterialController {
  constructor(
    private materialService:MaterialService,
    private toolsService:ToolsService
  ){}

  @Get()
  @ApiOperation({ summary: "物料列表", operationId: "list" })
  async index(@Response() res) {
    const data = await this.materialService.find();
    await this.toolsService.success(res, data)
  }

  @Post()
  @ApiOperation({ summary: "增加物料"})
  async add(@Body() body:MaterialDto, @Response() res) {
    try {
      await this.materialService.add(body);
      await this.toolsService.success(res)
    }catch (error){
      throw new BadRequestException({code:400,msg:"添加物料类型错误"})
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "显示一个物料信息" })
  async read(@Param("id") id: number, @Response() res) {
    try {
      const data = await this.materialService.find({id: id});
      await this.toolsService.success(res, data)
    } catch (err) {
      await this.toolsService.error(res)
    }
  }

  @Put(":id")
  @ApiOperation({ summary: "修改物料信息"})
  async edit(@Param("id") id: number, @Body() body:MaterialDto, @Response() res) {
    try{
      await this.materialService.update({ "id": id }, { ...body });
      await this.toolsService.success(res)
    }catch (err){
      await this.toolsService.error(res, "修改物料类型错误，请重新修改", err)
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "删除物料信息"})
  async delete(@Param("id") id: number, @Response() res) {
    try {
      await this.materialService.delete({ "id": id })
      await this.toolsService.success(res)
    } catch (err) {
      await this.toolsService.error(res)
    }
  }
}

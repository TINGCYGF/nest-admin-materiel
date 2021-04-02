import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TestEntity } from "@libs/db/models/materials/test/test.entity";
import { CrudService } from "../../../../../../apps/admin/src/common/decorators/crud.decorator";

@Injectable()
export class TestService extends CrudService{

  constructor(
    @InjectRepository(TestEntity)
    private readonly testRepository: Repository<TestEntity>,
  ) {
    super(testRepository)
  }

}

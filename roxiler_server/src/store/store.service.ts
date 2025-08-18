import { Injectable } from "@nestjs/common";
import { Store } from "./entities/Store.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class StoreService {

       constructor(@InjectRepository(Store) private storeRepository: Repository<Store>) { }


       async create(store: Store): Promise<Store> {
              return await this.storeRepository.save(store);
       }

       async findAll(): Promise<Store[]> {
              return await this.storeRepository.find();
       }

       async findOne(id: number): Promise<Store | null> {
              return await this.storeRepository.findOne({ where: {store_id: id } });
       }

}
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Wallet } from "src/common/database/entities/wallet.entity";
import { Repository } from "typeorm";
import { CreateWalletRes } from "./wallet.dtos";

@Injectable()
export class WalletService {
    constructor(@InjectRepository(Wallet) private readonly walletRepository: Repository<Wallet>) {}

    public async findWalletByAddress(address_: string): Promise<Wallet> {
        return await this.walletRepository.findOne({ where: { address: address_.toLowerCase() } });
    }

    public async findOrCreateWallet(address_: string): Promise<CreateWalletRes> {
        const wallet = await this.walletRepository.findOne({ where: { address: address_.toLowerCase() } });

        if (!wallet) {
            const wallet = await this.walletRepository.save({
                address: address_.toLowerCase(),
            });
            return { isCreated: true, wallet };
        }
        return { isCreated: false, wallet };
    }
}

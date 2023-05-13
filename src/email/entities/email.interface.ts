import { IItemEntity } from '../../orders/entities/items.entity';

export interface IEmail {
  sendEmail(
    customerEmail: string,
    oderId: string,
    purchasedItems: IItemEntity[],
    totalPrice: number
  ): Promise<void>;
}

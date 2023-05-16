import { IDeductItems } from '../entities/deduct-items.entity';
import { IItemEntity } from '../entities/items.entity'

export const extractProductIdsAndCreateDeductItems = (items: IItemEntity[]): IDeductItems[] => {
  return items.map(item => ({
    productId: item.productId,
    deductAmount: item.quantity,
  }));
}

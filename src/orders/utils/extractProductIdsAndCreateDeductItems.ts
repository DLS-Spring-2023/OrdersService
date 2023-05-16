import { IDeductItem } from '../entities/deduct-item.entity';
import { IItemEntity } from '../entities/items.entity'

export const extractProductIdsAndCreateDeductItems = (items: IItemEntity[]): IDeductItem[] => {
  return items.map(item => ({
    productId: item.productId,
    deductAmount: item.quantity,
  }));
}

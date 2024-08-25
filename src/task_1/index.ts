/** Задача 1 - MoneyRepository
 * Имеется класс денежного хранилища - MoneyRepository.
 * Который должен хранить денежные единицы
 * разных валют, разного номинала и в разном количестве.
 * Требуется:
 * 1) Реализовать классу MoneyRepository 2 метода:
 * 		1.1) giveOutMoney - позволяет достать денежные единицы из хранилища по принципу жадного алгоритма:
 * 			 сумма 1350RUB будет выдана
 * 			 одной купюрой номиналом 1000RUB,
 * 			 одной купюрой номиналом 200RUB,
 * 			 одной купюрой номиналом 100RUB,
 * 			 одной купюрой номиналом 50RUB
 * 			 с учетом, что все эти купюры будут находится в хранилище.
 * 			 Принимает аргументы count - сумма, требуемая к выдаче, currency - валюта
 * 			 Если сумма была собрана и выдана, то метод возвращает true, иначе false
 * 		1.2) takeMoney - позволяет положить в хранилище денежные единицы разных номиналов и разного количества
 * 2) Типизировать все свойства и методы класса MoneyRepository,
 * 	  пользуясь уже предоставленными интерфейсами (избавиться от всех any типов)
*/

import { Currency } from '../enums';

interface IMoneyInfo {
	denomination: string;
	currency: Currency;
}

export interface IMoneyUnit {
	moneyInfo: IMoneyInfo;
	count: number;
}

export class MoneyRepository {
	private _repository: number;
	constructor(initialRepository: number) {
		this._repository = initialRepository;
	}

	public giveOutMoney(count: number, currency: string): boolean {
		for(let i = 0; count != 0; i++){
			if(count / 1000 >= 1){
                let intCount: number = Math.trunc(count/1000);
                count -= intCount*1000;
			}
			else if(count/200 >= 1){
				let intCount: number = Math.trunc(count/200);
                count -= intCount*200;
			}
			else if(count/100 >= 1){
				let intCount: number = Math.trunc(count/100);
                count -= intCount*100;
			}
			else if(count/50 >= 1){
				let intCount: number = Math.trunc(count/50);
                count -= intCount*50;
			}
            else if(count<50 && count>0){
                return false;
            }
		}
		return true;
	}

	public takeMoney(moneyUnits: number): number {
        return this._repository+= moneyUnits;
	}
}
/** Задача 1 - BankOffice
 * Имеется класс BankOffice. Который должен хранить пользователей и банковские карты.
 * Пользователи банка могу иметь карту, а могут не иметь.
 * Карты могут иметь своего владельца, а могут не иметь.
 * Требуется:
 * 1) Реализовать классу BankOffice 3 метода:
 * 		1.1) authorize - позволяет авторизировать пользователя:
 * 			 Пользователь считается авторизованым, если карта принадлежит ему и пин-код введен корректно
 * 			 Принимает аргументы userId - id пользователя, cardId - id банковской карты, cardPin - пин-код карты
 * 			 Если пользователь был успешно авторизован, то метод возвращает true, иначе false
 * 		1.2) getCardById - позволяет получить объект банковской карты из хранилища по id карты
 *		1.3) isCardTiedToUser - позволяет по id карты узнать, привзяана ли карта к какому-нибудь пользователю
 *			 возвращает true - если карта привязана к какому-нибудь пользователю, false в ином случае
 * 2) Типизировать все свойства и методы класса MoneyRepository,
 * 	  пользуясь уже предоставленными интерфейсами (избавиться от всех any типов)
*/

import { Currency } from '../enums';

interface ICard {
	id: string;
	balance: number;
	currency: Currency,
	pin: string,
}

export interface IBankUser {
	id: string;
	name: string;
	surname: string;
	cards: Array<ICard>;
}

export class BankOffice {
	private _users: Partial<IBankUser>;
	private _cards: ICard;

	constructor(users: Partial<IBankUser>, cards: ICard) {
		this._users = users;
		this._cards = cards;
	}

	public authorize(userId: string, cardId: string, cardPin: number): boolean {

		if (this._users.cards == null) return false    //Есть ли карта у пользователя
		let coincidence: boolean = false
		for (let item of this._users.cards){
			if (item.id == cardId && item.pin == cardPin.toString()){    //Если у пользователя есть необходимая карта и пинкод совпадает
				coincidence = true
			}
		}
		if (coincidence == true){
			return true
		}
		return false
	}

	public getCardById(cardId: string): ICard {
		if(cardId == this._cards.id){
			return this._cards
		}
		throw new Error("Card not found")
	}

	public isCardTiedToUser(cardId: string): boolean {
		if(cardId != this._cards.id) return false
		if((this._users.cards != null)){
			let coincidence: boolean = false
			for (let item of this._users.cards){
				if(item.id == cardId){
					coincidence = true
					return true
				}
			}
			if (coincidence == false){
				return false
			}
		}
		return false
	}
}
import random
from copy import deepcopy

cards = []
N = 2

two = ["2"] * 4 * N
three = ["3"] * 4 * N
four = ["4"] * 4 * N
five = ["5"] * 4 * N
six = ["6"] * 4 * N
seven = ["7"] * 4 * N
eight = ["8"] * 4 * N
nine = ["9"] * 4 * N
ten = ["10"] * 4 * N
J = ["J"] * 4 * N
Q = ["Q"] * 4 * N
K = ["K"] * 4 * N
A = ["A"] * 4 * N
King = ['King'] * 1 * N
Queen = ['Queen'] * 1 * N

cards.extend(two)
cards.extend(three)
cards.extend(four)
cards.extend(five)
cards.extend(six)
cards.extend(seven)
cards.extend(eight)
cards.extend(nine)
cards.extend(ten)
cards.extend(J)
cards.extend(Q)
cards.extend(K)
cards.extend(A)
cards.extend(King)
cards.extend(Queen)


class Player(object):
	def __init__(self):
		self.cards = []
		self.four_bomb = 0
		self.five_bomb = 0
		self.six_bomb = 0
		self.seven_bomb = 0
		self.eight_bomb = 0
		self.king_bomb = 0

Farmer_A = Player()
Farmer_B = Player()
Farmer_C = Player()
Landowner = Player()


def deliver_cards(cards, n):
	i = 0
	list = []
	while i < n:
		j = random.randint(0, len(cards)-1)
		list.append(cards[j]) 
		cards.pop(j)
		i += 1
	return list


def judge_bomb(player, cards):
	list = set(cards)
	for i in list:
		if cards.count(i) >= 4 :
			player.four_bomb += 1
		if cards.count(i) == 5 :
			player.five_bomb += 1
		if cards.count(i) == 6 :
			player.six_bomb += 1
		if cards.count(i) == 7 :
			player.seven_bomb += 1
		if cards.count(i) == 8 :
			player.eight_bomb += 1


def repeat_play(times):
	i = 0
	while i < times:
		card = deepcopy(cards)

		Farmer_A.cards = deliver_cards(card, 25)
		Farmer_B.cards = deliver_cards(card, 25)
		Farmer_C.cards = deliver_cards(card, 25)
		Landowner.cards = card

		judge_bomb(Farmer_A, Farmer_A.cards)
		judge_bomb(Farmer_B, Farmer_B.cards)
		judge_bomb(Farmer_C, Farmer_C.cards)
		judge_bomb(Landowner, Landowner.cards)

		i += 1


repeat_play(10000)


print(Farmer_A.four_bomb, Farmer_A.five_bomb, Farmer_A.six_bomb, Farmer_A.seven_bomb, Farmer_A.eight_bomb)
print(Farmer_B.four_bomb, Farmer_B.five_bomb, Farmer_B.six_bomb, Farmer_B.seven_bomb, Farmer_B.eight_bomb)
print(Farmer_C.four_bomb, Farmer_C.five_bomb, Farmer_C.six_bomb, Farmer_C.seven_bomb, Farmer_C.eight_bomb)
print(Landowner.four_bomb, Landowner.five_bomb, Landowner.six_bomb, Landowner.seven_bomb, Landowner.eight_bomb)

import csv

file_csv = "/home/adelfael/work-demo/boss-prediction/prediction.csv"

data = []
with open(file_csv) as f:
    reader = csv.DictReader(f)
    for row in reader:
        data.append(row)

def probabilityToBeatBoss(suit, animal, fruit):
    suit_wins = 0
    suit_total = 0
    for row in data:
        if row['Card Suit'] == suit:
            suit_total += 1
            if row['Result'] == 'True':
                suit_wins += 1

    animal_wins = 0
    animal_total = 0
    for row in data:
        if row['Animal Name'] == animal:
            animal_total += 1
            if row['Result'] == 'True':
                animal_wins += 1

    fruit_wins = 0
    fruit_total = 0
    for row in data:
        if row['Fruit'] == fruit:
            fruit_total += 1
            if row['Result'] == 'True':
                fruit_wins += 1

    suit_chance = suit_wins / suit_total
    animal_chance = animal_wins / animal_total
    fruit_chance = fruit_wins / fruit_total

    # we divided over 3 cuz we should only have one chance
    total_chance = (suit_chance + animal_chance + fruit_chance) / 3

    return round(total_chance * 100, 1)


print(probabilityToBeatBoss('Hearts', 'Lion', 'Apple'))
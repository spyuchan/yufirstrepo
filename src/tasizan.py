total = 1
print(total)

for i in range(2, 51):
    prev_total = total
    total += i
    print(f"{prev_total}足す{i}は{total}です！")


a = int(input())
a = input()  # Ввод строки чисел
a = a.split()  # Разбиваем строку на список строк
c = sorted(set(map(int, a)), reverse=True)  # Преобразуем в множество, сортируем по убыванию

if len(c) > 1:
    print(c[1])  # Выводим второй элемент
else:
    print(c[0])
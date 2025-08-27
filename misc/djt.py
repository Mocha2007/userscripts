# https://www.cnn.com/politics/live-news/trump-hush-money-trial-04-15-24/h_2a909678d55da35a2d21b00e3949baba
# 12.3% of Manhattan voted for trump
def main(n: int = 1000000, f_trump: float = 0.123, jurors: int = 12) -> list[float]:
    """compute distribution of jurors who voted for trump"""
    from random import random
    def trial() -> int:
        """individual sample"""
        return sum(random() < f_trump for _ in range(jurors))
    results = [0 for _ in range(jurors)]
    for _ in range(n):
        results[trial()] += 1
    return [r/n for r in results]

print(main())

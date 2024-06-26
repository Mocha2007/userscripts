


def e2024(n = 100000):
    from random import random
    STATE_EV = {
        'AK': 3,
        'AL': 9,
        'AR': 6,
        'AZ': 11,
        'CA': 54,
        'CO': 10,
        'CT': 7,
        'DC': 3,
        'DE': 3,
        'FL': 30,
        'GA': 16,
        'HI': 4,
        'IA': 6,
        'ID': 4,
        'IL': 19,
        'IN': 11,
        'KS': 6,
        'KY': 8,
        'LA': 8,
        'MA': 11,
        'MD': 10,
        'ME': 2,
        'ME-1': 1,
        'ME-2': 1,
        'MI': 15,
        'MN': 10,
        'MO': 10,
        'MS': 6,
        'MT': 4,
        'NC': 16,
        'ND': 3,
        'NE': 2,
        'NE-1': 1,
        'NE-2': 1,
        'NE-3': 1,
        'NH': 4,
        'NJ': 14,
        'NM': 5,
        'NV': 6,
        'NY': 28,
        'OH': 17,
        'OK': 7,
        'OR': 8,
        'PA': 19,
        'RI': 4,
        'SC': 9,
        'SD': 3,
        'TN': 11,
        'TX': 40,
        'UT': 6,
        'VA': 13,
        'VT': 3,
        'WA': 12,
        'WI': 10,
        'WV': 4,
        'WY': 3,
    }
    # chance of R win
    STATE_ODDS = {
        'AK': 0.9,
        'AL': 1,
        'AR': 1,
        'AZ': 0.5,
        'CA': 0,
        'CO': 0,
        'CT': 0,
        'DC': 0,
        'DE': 0,
        'FL': 0.9,
        'GA': 0.5,
        'HI': 0,
        'IA': 1,
        'ID': 1,
        'IL': 0,
        'IN': 1,
        'KS': 1,
        'KY': 1,
        'LA': 1,
        'MA': 0,
        'MD': 0,
        'ME': 0.1,
        'ME-1': 0,
        'ME-2': 0.9,
        'MI': 0.5,
        'MN': 0.2,
        'MO': 1,
        'MS': 1,
        'MT': 1,
        'NC': 0.5,
        'ND': 1,
        'NE': 1,
        'NE-1': 1,
        'NE-2': 0.3,
        'NE-3': 1,
        'NH': 0.1,
        'NJ': 0,
        'NM': 0,
        'NV': 0.5,
        'NY': 0,
        'OH': 0.9,
        'OK': 1,
        'OR': 0,
        'PA': 0.5,
        'RI': 0,
        'SC': 1,
        'SD': 1,
        'TN': 1,
        'TX': 0.7,
        'UT': 1,
        'VA': 0.1,
        'VT': 0,
        'WA': 0,
        'WI': 0.5,
        'WV': 1,
        'WY': 1,
    }
    WINS = {
        'D': 0,
        'R': 0,
        'Tie': 0,
    }
    TIES = []
    def test() -> str:
        CURR = {
            'D': 0,
            'R': 0,
        }
        STATES = {}
        for state, p in STATE_ODDS.items():
            victor = 'DR'[random() < p]
            CURR[victor] += STATE_EV[state]
            if p % 1:
                STATES[state] = victor
        if CURR['D'] < CURR['R']:
            return 'R'
        if CURR['R'] < CURR['D']:
            return 'D'
        # else tie
        TIES.append(STATES)
        return 'Tie'
    
    for _ in range(n):
        WINS[test()] += 1
    
    return WINS, TIES

def FORMAT_TIE(TIES) -> str:
    HEADERS = '\t'.join(TIES[0].keys())
    VALUES = '\n'.join(map(lambda TIE: '\t'.join(TIE.values()), TIES))
    return HEADERS + '\n' + VALUES
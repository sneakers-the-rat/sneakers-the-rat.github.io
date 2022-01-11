import pandas as pd
import numpy as np
from tqdm.notebook import tqdm
import json

try:
    with open('wordle_words.json', 'r') as wfile:
        words = json.load(wfile)
        
    game, legal = words['game'], words['legal']
except Exception as e:
    print(f'couldnt load words, got {e}')
    game = []

def make_charray(words:list[str]) -> np.ndarray:
    """split words into n x 5 character array"""
    game_char = [[*word] for word in game]
    charray = np.array(game_char)
    return charray


def guess(word, correct):
    """
    return the status of each character in a guess, given a correct word.
    0 == wrong,
    1 == present, but wrong position
    2 == correct
    """
    assert len(word) == len(correct)
    ret = []
    for word_letter, correct_letter in zip(word, correct):
        if word_letter == correct_letter:
            ret.append(2)
        elif word_letter in correct:
            ret.append(1)
        else:
            ret.append(0)
    return np.array(ret)


def possible_words(words:list[str], word:str, correct:str) -> list[str]:
    charray = make_charray(words)
    wordarray = np.array(words)
    possible_mask = np.ones(charray.shape[0], dtype=bool)
    guessed = guess(word, correct)
    
    if sum(guessed) == 0:
        return words
    
    # filter to words that have correct letter in correct position
    correct_idx = np.where(guessed == 2)[0]
    for idx in correct_idx:
        possible_mask = np.logical_and(
            possible_mask,
            charray[:,idx] == correct[idx]
        )
        
    possible_words = wordarray[possible_mask].tolist()
        
    # filter to words that contain any partial matches
    partial_letters = [word[i] for i in np.where(guessed == 1)[0]]
    for letter in partial_letters:
        possible_words = [w for w in possible_words if letter in w]
        
    return possible_words


def entropy_reduction(correct:str, words:list[str]=game, return_words=False, pbar=False) -> pd.DataFrame:
    """
    get the number of possible words remaining after guessing every word, 
    given a correct word
    """
    if pbar:
        _pbar = tqdm(total=len(words), position=0)

    guesses = []
    for word in words:
        poss_words = possible_words(words, word, correct)
        if return_words:
            guesses.append((word, correct, len(poss_words), poss_words))
        else:
            guesses.append((word, correct, len(poss_words)))
        if pbar:
            _pbar.update()
    
    if return_words:
        
        return pd.DataFrame(guesses, columns=["word", "correct", "possible", "possible_words"])
    else:
        return pd.DataFrame(guesses, columns=["word", "correct", "possible"])
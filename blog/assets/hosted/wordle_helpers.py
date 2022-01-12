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

def guess(word:str, correct:str) -> np.ndarray:
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

def possible_words(words:list[str], word:str, correct:str, charray:np.ndarray=None, wordarray=None) -> list[str]:
    if charray is None:
        charray = make_charray(words)
    if wordarray is None:
        wordarray     = np.array(words)

    # if we guess the correct word, there is only one possible word.
    if word == correct:
        return [word]

    guessed       = guess(word, correct)
    
    # step 1: return wordlist if no matches
    if sum(guessed) == 0:
        return words
    
    # step 2: filter to words that have correct letter in correct position
    correct_mask = np.ones(charray.shape[0], dtype=bool)
    correct_idx = np.where(guessed == 2)[0]
    for idx in correct_idx:
        correct_mask = np.logical_and(
            correct_mask,
            charray[:,idx] == correct[idx]
        )
        
    # step 3: filter to words that contain any partial matches
    partial_letters = [word[i] for i in np.where(guessed == 1)[0]]
    partial_mask = np.ones(charray.shape[0], dtype=bool)
    for letter in partial_letters:
        partial_mask = np.logical_and(
            partial_mask,
            np.any(charray == letter, axis=1)
        )

    # step 3.5 remove the guessed word itself
    correct_mask[wordarray == word] = False
        
    possible_mask = np.logical_and(correct_mask, partial_mask)
    possible_words = wordarray[possible_mask].tolist()
        
    return possible_words


def entropy_reduction(correct:str, words:list[str]=game, return_words=False, pbar=False, reverse=False) -> pd.DataFrame:
    """
    get the number of possible words remaining after guessing every word, 
    given a correct word
    """
    charray = make_charray(words)
    wordarray = np.array(words)
    if pbar:
        _pbar = tqdm(total=len(words), position=0)

    guesses = []
    for word in words:
        if reverse:
            poss_words = possible_words(words, correct, word, charray, wordarray)
        else:
            poss_words = possible_words(words, word, correct, charray, wordarray)
            
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


if __name__ == "__main__":
    results = []
    for word in game:
        res = entropy_reduction(word, pbar=True)
        results.append(res)
        print(res)


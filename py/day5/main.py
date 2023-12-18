import math
from pathlib import Path

from utilities import read_text_file

InitialSeedList = list[int]
TransformationMap = list[tuple[int, ...]]  # single transformation - seed to soil
MapsType = list[TransformationMap]  # all the way from seed to location


def preprocess() -> tuple[InitialSeedList, MapsType]:
    text = read_text_file(Path(__file__).parent / "input.txt")
    sections = [section.strip().split("\n") for section in text.strip().split("\n\n")]
    seeds: InitialSeedList = [
        int(seed) for seed in sections[0][0].split(": ")[1].split()
    ]
    maps: MapsType = [
        [
            tuple(int(num) for num in stringOfNums.split())
            for stringOfNums in section[1:]
        ]
        for section in sections[1:]
    ]

    return seeds, maps


def transformSource(source: int, transformation: TransformationMap) -> int:
    for destination_range_start, source_range_start, range_length in transformation:
        if source >= source_range_start and source < (
            source_range_start + range_length
        ):
            return source + (destination_range_start - source_range_start)
    return source


def seedToLocation(seed: int, maps: list[TransformationMap]) -> int:
    item_to_process = seed
    for map in maps:
        item_to_process = transformSource(item_to_process, map)
    return item_to_process


def processAllSeeds() -> int:
    seeds, maps = preprocess()
    min_location = math.inf
    for seed in seeds:
        min_location = min(seedToLocation(seed, maps), min_location)
    return int(min_location)


processAllSeeds()

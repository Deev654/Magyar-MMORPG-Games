#!/usr/bin/env python3
"""Simple command line launcher for the Magyar MMORPG prototype."""

import argparse
import sys


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Magyar MMORPG prototype launcher",
        epilog=(
            "This project is currently in a planning phase. "
            "Use the --mode flag to explore the available placeholders."
        ),
    )
    parser.add_argument(
        "--mode",
        default="overview",
        choices=["overview", "client", "server"],
        help="Which component to start (currently placeholder logic).",
    )
    return parser.parse_args(argv)


def run_overview() -> None:
    print("Magyar MMORPG fejlesztés alatt!")
    print(
        "Ez az indító csak egy prototípus. A tényleges játék kliens és szerver "
        "későbbi lépésekben lesz implementálva."
    )


def run_client() -> None:
    print("[KLIENS] A kliens modul még nincs implementálva.")
    print(
        "Fejlesztőknek: állítsd be a kliens projektet a választott motorral, "
        "majd frissítsd ezt az indítót a megfelelő parancsokkal."
    )


def run_server() -> None:
    print("[SZERVER] A szerver modul még nincs implementálva.")
    print(
        "Fejlesztőknek: konfiguráld a backend környezetet, majd egészítsd ki "
        "a game_launcher.py fájlt a szerver indítási logikájával."
    )


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)

    if args.mode == "overview":
        run_overview()
    elif args.mode == "client":
        run_client()
    elif args.mode == "server":
        run_server()
    else:
        raise ValueError(f"Ismeretlen mód: {args.mode}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

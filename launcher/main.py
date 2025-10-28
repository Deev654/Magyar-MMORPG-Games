"""Simple MMORPG launcher GUI with login and registration."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path
import tkinter as tk
from tkinter import messagebox, ttk


DATA_FILE = Path(__file__).with_name("users.json")


class LauncherApp:
    """Encapsulates the Tkinter GUI logic for the MMORPG launcher."""

    def __init__(self, master: tk.Tk) -> None:
        self.master = master
        self.master.title("Magyar MMORPG Launcher")
        self.master.geometry("420x360")
        self.master.resizable(False, False)

        self.users = self._load_users()
        self.logged_in_user: str | None = None

        self._build_ui()

    def _build_ui(self) -> None:
        title = ttk.Label(
            self.master,
            text="Üdvözöl a Magyar MMORPG!",
            font=("Segoe UI", 16, "bold"),
        )
        title.pack(pady=(20, 10))

        notebook = ttk.Notebook(self.master)
        notebook.pack(fill=tk.BOTH, expand=True, padx=20)

        self.login_frame = ttk.Frame(notebook)
        self.register_frame = ttk.Frame(notebook)

        notebook.add(self.login_frame, text="Bejelentkezés")
        notebook.add(self.register_frame, text="Regisztráció")

        self._build_login_tab()
        self._build_register_tab()

        self.play_button = ttk.Button(
            self.master,
            text="Játék indítása",
            command=self._handle_play,
            state=tk.DISABLED,
        )
        self.play_button.pack(pady=20)

    # --- Login Tab -------------------------------------------------
    def _build_login_tab(self) -> None:
        ttk.Label(self.login_frame, text="Felhasználónév:").grid(
            row=0, column=0, padx=10, pady=10, sticky=tk.W
        )
        self.login_username = ttk.Entry(self.login_frame)
        self.login_username.grid(row=0, column=1, padx=10, pady=10)

        ttk.Label(self.login_frame, text="Jelszó:").grid(
            row=1, column=0, padx=10, pady=10, sticky=tk.W
        )
        self.login_password = ttk.Entry(self.login_frame, show="*")
        self.login_password.grid(row=1, column=1, padx=10, pady=10)

        login_button = ttk.Button(
            self.login_frame, text="Bejelentkezés", command=self._handle_login
        )
        login_button.grid(row=2, column=0, columnspan=2, pady=20)

    # --- Register Tab ----------------------------------------------
    def _build_register_tab(self) -> None:
        ttk.Label(self.register_frame, text="Felhasználónév:").grid(
            row=0, column=0, padx=10, pady=10, sticky=tk.W
        )
        self.register_username = ttk.Entry(self.register_frame)
        self.register_username.grid(row=0, column=1, padx=10, pady=10)

        ttk.Label(self.register_frame, text="Jelszó:").grid(
            row=1, column=0, padx=10, pady=10, sticky=tk.W
        )
        self.register_password = ttk.Entry(self.register_frame, show="*")
        self.register_password.grid(row=1, column=1, padx=10, pady=10)

        ttk.Label(self.register_frame, text="Jelszó megerősítése:").grid(
            row=2, column=0, padx=10, pady=10, sticky=tk.W
        )
        self.register_confirm = ttk.Entry(self.register_frame, show="*")
        self.register_confirm.grid(row=2, column=1, padx=10, pady=10)

        register_button = ttk.Button(
            self.register_frame, text="Fiók létrehozása", command=self._handle_register
        )
        register_button.grid(row=3, column=0, columnspan=2, pady=20)

    # --- Event Handlers --------------------------------------------
    def _handle_login(self) -> None:
        username = self.login_username.get().strip()
        password = self.login_password.get()

        if not username or not password:
            messagebox.showwarning("Hiányzó adatok", "Tölts ki minden mezőt!")
            return

        if username not in self.users:
            messagebox.showerror("Hiba", "Nincs ilyen felhasználó.")
            return

        hashed = self._hash_password(password)
        if self.users[username] != hashed:
            messagebox.showerror("Hiba", "Helytelen jelszó.")
            return

        self.logged_in_user = username
        self.play_button.config(state=tk.NORMAL)
        messagebox.showinfo(
            "Siker", f"Sikeres bejelentkezés, jó játékot {username}!"
        )
        self.login_password.delete(0, tk.END)

    def _handle_register(self) -> None:
        username = self.register_username.get().strip()
        password = self.register_password.get()
        confirm = self.register_confirm.get()

        if not username or not password or not confirm:
            messagebox.showwarning("Hiányzó adatok", "Tölts ki minden mezőt!")
            return

        if len(username) < 3:
            messagebox.showwarning(
                "Rövid név", "A felhasználónév legalább 3 karakter legyen."
            )
            return

        if password != confirm:
            messagebox.showerror("Hiba", "A jelszavak nem egyeznek.")
            return

        if username in self.users:
            messagebox.showerror("Hiba", "Ez a felhasználónév már foglalt.")
            return

        hashed = self._hash_password(password)
        self.users[username] = hashed
        self._save_users()

        messagebox.showinfo(
            "Siker", "Fiók létrehozva! Jelentkezz be a 'Bejelentkezés' fülön."
        )
        self.register_username.delete(0, tk.END)
        self.register_password.delete(0, tk.END)
        self.register_confirm.delete(0, tk.END)

    def _handle_play(self) -> None:
        if self.logged_in_user is None:
            messagebox.showwarning("Figyelem", "Előbb jelentkezz be!")
            return

        messagebox.showinfo(
            "Játék indítása",
            f"{self.logged_in_user}, a játék indul! (Itt csatlakozna a kliens)",
        )

    # --- Persistence -----------------------------------------------
    def _load_users(self) -> dict[str, str]:
        if not DATA_FILE.exists():
            return {}
        try:
            with DATA_FILE.open("r", encoding="utf-8") as fh:
                data = json.load(fh)
        except json.JSONDecodeError:
            messagebox.showwarning(
                "Hiba",
                "A felhasználói adatbázis sérült, újrakezdés...",
            )
            return {}
        if not isinstance(data, dict):
            return {}
        return {str(k): str(v) for k, v in data.items()}

    def _save_users(self) -> None:
        with DATA_FILE.open("w", encoding="utf-8") as fh:
            json.dump(self.users, fh, indent=2, ensure_ascii=False)

    @staticmethod
    def _hash_password(password: str) -> str:
        return hashlib.sha256(password.encode("utf-8")).hexdigest()


def main() -> None:
    root = tk.Tk()
    LauncherApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()

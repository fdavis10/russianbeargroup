#!/usr/bin/env python
"""Ежедневный планировщик XLSX-бэкапов БД."""

import os
import subprocess
import sys
import time
from datetime import datetime, timedelta

BACKUP_HOUR = int(os.getenv("BACKUP_HOUR", "3"))
BACKUP_MINUTE = int(os.getenv("BACKUP_MINUTE", "0"))


def run_backup() -> None:
    print(f"[{datetime.now().isoformat(sep=' ', timespec='seconds')}] Запуск export_db_xlsx...")
    subprocess.run([sys.executable, "manage.py", "export_db_xlsx"], check=True)


def seconds_until_next_run() -> float:
    now = datetime.now()
    next_run = now.replace(hour=BACKUP_HOUR, minute=BACKUP_MINUTE, second=0, microsecond=0)
    if next_run <= now:
        next_run += timedelta(days=1)
    return (next_run - now).total_seconds(), next_run


def main() -> None:
    print(
        f"Планировщик бэкапов запущен. "
        f"Ежедневно в {BACKUP_HOUR:02d}:{BACKUP_MINUTE:02d}."
    )

    # Бэкап сразу при старте контейнера (удобно после деплоя).
    run_backup()

    while True:
        delay, next_run = seconds_until_next_run()
        print(f"Следующий бэкап: {next_run.isoformat(sep=' ', timespec='seconds')}")
        time.sleep(delay)
        run_backup()


if __name__ == "__main__":
    main()

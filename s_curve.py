import sys
from pathlib import Path

import pandas as pd
import matplotlib.pyplot as plt


def generate_s_curve(csv_path: Path, output_path: Path) -> None:
    """Generate an S-curve plot from progress data.

    Parameters
    ----------
    csv_path : Path
        Path to CSV file containing Date, Planned, Actual and Resource columns.
    output_path : Path
        File path where the generated plot will be saved.
    """
    df = pd.read_csv(csv_path, parse_dates=['Date'])
    df.sort_values('Date', inplace=True)

    df['CumulativePlanned'] = df['Planned'].cumsum()
    df['CumulativeActual'] = df['Actual'].cumsum()
    df['CumulativeResource'] = df['Resource'].cumsum()
    df['Duration'] = (df['Date'] - df['Date'].min()).dt.days

    fig, ax1 = plt.subplots(figsize=(10, 6))
    ax1.plot(df['Duration'], df['CumulativePlanned'], label='Planned', marker='o')
    ax1.plot(df['Duration'], df['CumulativeActual'], label='Actual', marker='x')
    ax1.set_xlabel('Duration (days)')
    ax1.set_ylabel('Cumulative Progress (%)')

    ax2 = ax1.twinx()
    ax2.plot(df['Duration'], df['CumulativeResource'], color='green', label='Resource', marker='s')
    ax2.set_ylabel('Cumulative Resource')

    lines_1, labels_1 = ax1.get_legend_handles_labels()
    lines_2, labels_2 = ax2.get_legend_handles_labels()
    ax1.legend(lines_1 + lines_2, labels_1 + labels_2, loc='upper left')
    ax1.grid(True)
    fig.tight_layout()

    output_path.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(output_path)
    print(f"S-curve saved to {output_path}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python s_curve.py <input_csv> [output_image]")
        raise SystemExit(1)

    csv_file = Path(sys.argv[1])
    out_file = Path(sys.argv[2]) if len(sys.argv) > 2 else Path('s_curve.png')
    generate_s_curve(csv_file, out_file)

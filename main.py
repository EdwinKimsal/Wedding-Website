# Import(s)
import sqlite3
import sys

# Main function
def main(table):
    # Set path of database
    path = "C:\ProgramData\MySQL\MySQL Server 8.0\Data\wedding_rsvp\guests.ibd"

    # Make connection with cursor
    conn = sqlite3.connect(path)
    crsr = conn.cursor()

    # Execute command
    results = crsr.execute(f"SELECT * FROM {table}")

    # Close cursor
    conn.close()

    # Create a file
    with open("test.csv", "w") as f:
        f.writelines(results)


# Call main function
main(sys.arg[0])
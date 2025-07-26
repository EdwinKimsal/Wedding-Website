# Import(s)
import mysql.connector
import csv
import sys

# Main function
def main(table):
    # Set path of database
    conn = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "abcde",
        database = "wedding_rsvp"
    )

    # Make connection with cursor and execute command
    with conn.cursor() as crsr:
        crsr.execute(f"SELECT * FROM {table};")
        results = crsr.fetchall()

    # Create a file to store data in a csv file
    with open("data.csv", "w", newline="", encoding="utf-8") as f:
        # Create writer
        writer = csv.writer(f)

        # Write header
        writer.writerow(["Attendee", "Bachelor Party", "Bachelorette Party", "Bridal Party", "Rehearsal Dinner", "Ceremony & Reception", "Meal", "Restrictions", "Email"])

        # Write data
        for row in results:
            writer.writerow(list(row))


# Call main function
main(sys.argv[1])

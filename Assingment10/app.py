import pandas as pd_RM


def perform_task(file_path):

    try:
        df_RM=pd_RM.read_csv(file_path, encoding='latin-1')
    except FileNotFoundError:
        print(f"Error: file '{file_path}' not found.")
    # return


    # Display rows
    print("Preview the dataset.")
    print(df_RM.head())


    # Get basic information about dataset.
    print("\nDataset Details.")
    print(df_RM.info())



if __name__ =="__main__":
    file_path=r"F:\BDSA\Assignment6n7Front\Assingment10\ontario_public_library_statistics_2022_open_data.csv"
    perform_task(file_path)
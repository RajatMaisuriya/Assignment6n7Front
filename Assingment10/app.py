import pandas as pd_RM


def perform_task(file_path):

    try:
        df_RM=pd_RM.read_csv(file_path, encoding='latin-1')
    except FileNotFoundError:
        print(f"Error: file '{file_path}' not found.")
    # return


    # Display rows
    print("Preview the dataset.")
    print(df_RM)



if __name__ =="__main__":
    file_path=r"F:\BDSA\BDProgramming\Assingment10\titanic.csv"
    perform_task(file_path)
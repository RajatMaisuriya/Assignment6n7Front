import pandas as pd_RM
import matplotlib.pyplot as plt_RM
import seaborn as sn_RM
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score,classification_report



    # 1.Task 1: Dataset Selection 
    # a.Choose two datasets from the provided repositories. 
    # Answer: I have chosen the following two datasets from the provided repositories:
    # Dataset 1: Titanic Dataset
    # Dataset 2: Economic Impact of Tourism


    # b.Justify your selection for each dataset based on its relevance to machine learning tasks. 
    # Include a brief paragraph explaining the dataset's potential for analysis and its suitability for machine learning applications.

    # Answer: Dataset 1: Titanic Dataset
    # Justification: Titanic dataset has many merits for analysis, it's also a relatively small and simplified dataset. 
    #                While it's a great starting point, real-world datasets can be more complex and nuanced.
    #                It contains information about the passengers aboard the RMS Titanic during its tragic maiden voyage, including whether they survived or not
    #                

    # Answer: Dataset 2: Economic Impact of Tourism
    # Justification: The economic impact of tourism dataset is rich in potential for both data analysis and machine learning. 
    #                It has fanacial data which are good use for predicting and macking analysis.
    #                Its structured format, relevance, and versatility make it a valuable resource for showcasing the various ways data can be explored, 
    #                preprocessed, analyzed, and leveraged for predictive modeling.





def perform_task(file_path): # Method for performing all the tasks.

    try:
        df_RM=pd_RM.read_csv(file_path, encoding='latin-1') # To create data frame from .csv file.
        # df1_RM=pd_RM.read_csv(file_path1, encoding='latin-1')
    except FileNotFoundError: # to handle error if file dose not exist.
        print(f"Error: file '{file_path}' not found.")
        # print(f"Error: file '{file_path1}' not found.")




    # 2.	Task 2: Data Exploration with Python 
    # a.	Perform exploratory data analysis (EDA) using Python for the first dataset. 
    # b.	Generate summary statistics, identify data types, and visualize the data distribution to gain insights into the dataset.


    # Display rows 
    print("Preview the dataset.")
    print(df_RM)
    # print(df1_RM)


    # Get basic information about dataset.
    print("\nDataset Details:")
    print(df_RM.info())
    # # print(df1_RM.info())

    # # Summary statastics of numerical columns.
    print("/n Summary Statistics:")
    print(df_RM.describe())
    # # print(df1_RM.describe())

    # # Check for missing values.
    print("\n Missing values")
    print(df_RM.isnull().sum())

    # #  Visualize the distribution of numerical features using histograms.
    print("\n Histogram of dataste")
    df_RM.hist(figsize=(10,8))
    plt_RM.tight_layout()
    plt_RM.show()


    # # # Visualize the correlation between numerical features using a heatmap
    # print("/n Correlation Heatmap:")
    # numeric_columns = df_RM.select_dtypes(include=['number'])
    # corre_matrix = numeric_columns.corr()
    # plt_RM.figure(figsize=(10,8))
    # sn_RM.heatmap(corre_matrix,annot=True,cmap="coolwarm")
    # plt_RM.show()

    





    # 3.	Task 3: Data Preprocessing with Python 
    # a.	Preprocess the data from the first dataset using Python. 
    # b.	Handle missing values, outliers, and perform feature engineering when necessary to prepare the data for machine learning models.
    

    # Handling outliers
    df_RM = df_RM[df_RM['Age'] < 60]  # Remove outliers where age is greater than 50.

    # Converting 'Sex' and 'Embarked' into category
    df_RM['Sex']=pd_RM.factorize(df_RM['Sex'])[0]
    df_RM['Embarked']=pd_RM.factorize(df_RM['Embarked'])[0]



    # Data preprocessing - Drop irrelevant columns and handle missing values
    df_RM.drop(['PassengerId', 'Name', 'Ticket', 'Cabin'], axis=1, inplace=True)
    df_RM['Embarked'].fillna(df_RM['Embarked'].mode()[0], inplace=True)
    df_RM['Age'].fillna(df_RM['Age'].median(), inplace=True)


    
    
    # 4.	Task 4: Implement Machine Learning Models with Python 
    # a.	Implement at least two different machine learning models (e.g., SVM, Random Forest, Neural Network) for the first dataset using Python. 
    # b.	Evaluate and compare the performance of each model using appropriate metrics to determine the most suitable model for the dataset.

    # Assuming 'Survived' is the column you want to predict
    X = df_RM.drop(['Survived'], axis=1)
    y = df_RM['Survived']

    #--------------------------------------------------------------------------------------------------

    # SVM model
    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=30)

    # Create an SVM model
    svm_model = SVC(kernel='linear')  

    # Train the model
    svm_model.fit(X_train, y_train)

    # Make predictions on the test set
    y_pred = svm_model.predict(X_test)



   #--------------------------------------------------------------------------------------------------

    # Random Forest Model
    # Create a Random Forest model
    random_forest_model = RandomForestClassifier(random_state=30)

    # Train the Random Forest model
    random_forest_model.fit(X_train, y_train)

    # Make predictions on the test set using the Random Forest model
    y_pred_rf = random_forest_model.predict(X_test)



    #--------------------------------------------------------------------------------------------------


     # Calculate the accuracy of the model
    accuracy_svm = accuracy_score(y_test, y_pred)
    print(f"Accuracy of SVM: {accuracy_svm:.2f}")

     # Calculate the accuracy of the Random Forest model
    accuracy_rf = accuracy_score(y_test, y_pred_rf)
    print(f'Accuracy of Random Forest: {accuracy_rf:.2f}')

    print("--------------------------------------------------------------------------------------------------")
    print("Evalution and Compare model")
    print("--------------------------------------------------------------------------------------------------")

    # Generate a classification report for the SVM model
    classification_report_svm = classification_report(y_test, y_pred)
    print('Classification Report SVM:\n', classification_report_svm)

   
    # Generate a classification report for the Random Forest model
    classification_report_rf = classification_report(y_test, y_pred_rf)
    print('Classification Report Random Forest:\n', classification_report_rf)

    
    #--------------------------------------------------------------------------------------------------
    # 5.	Task 5: Visualization with Python 
    # a.	Create meaningful visualizations (e.g., scatter plots, heatmaps, bar charts) for the first dataset using Python. 
    # b.	Use libraries like Matplotlib, Seaborn, or Plotly to create clear and insightful visual representations of the dataset.

    # Visualize Categorical features
    ("/n Categorical Features")
    categorical_features=df_RM.select_dtypes(include=["object"]).columns
    for feature in categorical_features:
        print(f"\n Value counts for {feature} ")
        print(df_RM[feature].value_counts())
        sn_RM.countplot(x=feature,data=df_RM)
        plt_RM.xticks(rotation=45)
        plt_RM.show()

    
    # Visualization 1: Bar plot of Survival Count
    sn_RM.countplot(x='Survived', data=df_RM)
    plt_RM.xlabel('Survived')
    plt_RM.ylabel('Count')
    plt_RM.title('Survival Count (0: Not Survived, 1: Survived)')
    plt_RM.show()



    # Visualization 2: Comparing Sex based on Price class.
    sn_RM.countplot(x='Pclass', hue='Sex', data=df_RM)
    plt_RM.xlabel('Sex')
    plt_RM.ylabel('Count')
    plt_RM.title('Survival Count based on Passenger Class')
    plt_RM.legend(title='Sex', labels=['male', 'female'])
    plt_RM.show()



    # Visualization 3: Box plot of Age based on Survived
    sn_RM.boxplot(x='Survived', y='Age', data=df_RM)
    plt_RM.xlabel('Survived')
    plt_RM.ylabel('Age')
    plt_RM.title('Age Distribution based on Survival')
    plt_RM.show()


    # Visualization 4: Heatmap 
    correlation_matrix = df_RM.corr()
    plt_RM.figure(figsize=(10,8))
    sn_RM.heatmap(correlation_matrix,annot = True, cmap="coolwarm")
    plt_RM.show()

   


if __name__ =="__main__":
    file_path1=r"F:\BDSA\Assignment6n7Front\Assingment10\Economic_Impact_of_Tourism.csv"
    file_path=r"F:\BDSA\Assignment6n7Front\Assingment10\titanic.csv"
    perform_task(file_path)

    # preprocessdataset(file_path)

    
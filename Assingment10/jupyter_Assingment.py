#!/usr/bin/env python
# coding: utf-8

# <H1>Assingment 10</H1>

# <H2>Name : Rajatkumar Maisuriya (8870363)</H2>

# In[2]:


import pandas as pd_RM


# In[10]:


file_path=r"F:\BDSA\Assignment6n7Front\Assingment10\titanic.csv"
try:
    df_RM=pd_RM.read_csv(file_path, encoding='latin-1') # To create data frame from .csv file.
    # df1_RM=pd_RM.read_csv(file_path1, encoding='latin-1')
except FileNotFoundError: # to handle error if file dose not exist.
    print(f"Error: file '{file_path}' not found.")
    # print(f"Error: file '{file_path1}' not found.")


# <p> # 2.	Task 2: Data Exploration with Python 
#     # a.	Perform exploratory data analysis (EDA) using Python for the first dataset. 
#     # b.	Generate summary statistics, identify data types, and visualize the data distribution to gain insights into the dataset.</p>

# In[13]:


# Display rows 
print("Preview the dataset.")
print(df_RM.head())
# print(df1_RM)


# In[14]:


# Get basic information about dataset.
print("\nDataset Details:")
print(df_RM.info())
# # print(df1_RM.info())


# In[16]:


# Summary statastics of numerical columns.
print("/n Summary Statistics:")
print(df_RM.describe())
# print(df1_RM.describe())


# In[17]:


# Check for missing values.
print("\n Missing values")
print(df_RM.isnull().sum())


# In[19]:


import matplotlib.pyplot as plt_RM


# In[20]:


# Visualize the distribution of numerical features using histograms.
print("\n Histogram of dataste")
df_RM.hist(figsize=(10,8))
plt_RM.tight_layout()
plt_RM.show()


# <H2>3.	Task 3: Data Preprocessing with Python </H2>

# <h3>a. Preprocess the data from the first dataset using Python.</h3>

# <h3>b.	Handle missing values, outliers, and perform feature engineering when necessary to prepare the data for machine learning models.</h3>

# <p>Handling outliers</p>

# In[22]:


df_RM = df_RM[df_RM['Age'] < 60]  # Remove outliers where age is greater than 60.
print(df_RM['Age'])


# <p>****************************************************</p>
# <p>Converting 'Sex' and 'Embarked' into category</p>

# In[23]:


df_RM['Sex']=pd_RM.factorize(df_RM['Sex'])[0]
df_RM['Embarked']=pd_RM.factorize(df_RM['Embarked'])[0]


# <p>****************************************</p>
# <p>Data preprocessing - Drop irrelevant columns and handle missing values</p>

# In[ ]:


df_RM.drop(['PassengerId', 'Name', 'Ticket', 'Cabin'], axis=1, inplace=True)
df_RM['Embarked'].fillna(df_RM['Embarked'].mode()[0], inplace=True)
df_RM['Age'].fillna(df_RM['Age'].median(), inplace=True)


# In[26]:


print(df_RM)


# <h2>4.	Task 4: Implement Machine Learning Models with Python </h2>

# <h3>a.	Implement at least two different machine learning models (e.g., SVM, Random Forest, Neural Network) for the first dataset using Python.</h3>

# In[27]:


# Assuming 'Survived' is the column you want to predict
X = df_RM.drop(['Survived'], axis=1)
y = df_RM['Survived']


# In[29]:


from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score,classification_report


# In[30]:


# SVM model
# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=30)

# Create an SVM model
svm_model = SVC(kernel='linear')  

# Train the model
svm_model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = svm_model.predict(X_test)


# In[32]:


#--------------------------------------------------------------------------------------------------

# Random Forest Model
# Create a Random Forest model
random_forest_model = RandomForestClassifier(random_state=30)

# Train the Random Forest model
random_forest_model.fit(X_train, y_train)

# Make predictions on the test set using the Random Forest model
y_pred_rf = random_forest_model.predict(X_test)


# <h3> b.	Evaluate and compare the performance of each model using appropriate metrics to determine the most suitable model for the dataset.</h3>

# In[33]:


# Calculate the accuracy of the model
accuracy_svm = accuracy_score(y_test, y_pred)
print(f"Accuracy of SVM: {accuracy_svm:.2f}")

# Calculate the accuracy of the Random Forest model
accuracy_rf = accuracy_score(y_test, y_pred_rf)
print(f'Accuracy of Random Forest: {accuracy_rf:.2f}')


# In[34]:


print("--------------------------------------------------------------------------------------------------")
print("Evalution and Compare model")
print("--------------------------------------------------------------------------------------------------")

# Generate a classification report for the SVM model
classification_report_svm = classification_report(y_test, y_pred)
print('Classification Report SVM:\n', classification_report_svm)

   
# Generate a classification report for the Random Forest model
classification_report_rf = classification_report(y_test, y_pred_rf)
print('Classification Report Random Forest:\n', classification_report_rf)


# <h2>Task 5: Visualization with Python </h2>

# <h3>a.	Create meaningful visualizations (e.g., scatter plots, heatmaps, bar charts) for the first dataset using Python.</h3>

# In[35]:


import seaborn as sn_RM


# In[38]:


# Visualization 1: Bar plot of Survival Count
sn_RM.countplot(x='Survived', data=df_RM)
plt_RM.xlabel('Survived')
plt_RM.ylabel('Count')
plt_RM.title('Survival Count (0: Not Survived, 1: Survived)')
plt_RM.show()


# In[39]:


# Visualization 2: Comparing Sex based on Price class.
sn_RM.countplot(x='Pclass', hue='Sex', data=df_RM)
plt_RM.xlabel('Sex')
plt_RM.ylabel('Count')
plt_RM.title('Survival Count based on Passenger Class')
plt_RM.legend(title='Sex', labels=['male', 'female'])
plt_RM.show()


# In[40]:


# Visualization 3: Box plot of Age based on Survived
sn_RM.boxplot(x='Survived', y='Age', data=df_RM)
plt_RM.xlabel('Survived')
plt_RM.ylabel('Age')
plt_RM.title('Age Distribution based on Survival')
plt_RM.show()


# In[41]:


# Visualization 4: Heatmap 
correlation_matrix = df_RM.corr()
plt_RM.figure(figsize=(10,8))
sn_RM.heatmap(correlation_matrix,annot = True, cmap="coolwarm")
plt_RM.show()


# In[47]:


# Visualization 3: Plot for Survival Count by Embarked Port
plt_RM.figure(figsize=(8, 6))
sn_RM.countplot(x='Embarked', hue='Survived', data=df_RM)
plt_RM.title('Survival Count by Embarked Port')
plt_RM.xlabel('Embarked Port')
plt_RM.ylabel('Count')
plt_RM.legend(title='Survived', labels=['No', 'Yes'])
plt_RM.show()


# In[ ]:





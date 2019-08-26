import cloudpickle as pickle



def classifier(test_data):
    """
    :param test_data: data that needs prediction list or single parameter
    :return: predicted class rotten or fresh
    """
    # Load the pickle data
    model = pickle.load(open('movie_model.pkl','rb'))
    vectorizer = pickle.load(open('vectorizer.pkl','rb'))

    # Check for the type
    if type(test_data) != list:
        test_data = list(test_data)
    # Transform the test data
    transformed = vectorizer.transform(test_data).toarray()
    # Predict the class
    predicted = model.predict(transformed).tolist()

    return predicted
    
    




from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import GaussianNB
import pandas as pd
import pickle



if __name__ == '__main__':

    # Read the data
    train = pd.read_csv("reviews.csv")
    # Cleanup the data
    train = train.loc[train['fresh']!="none", :]

    # Create a count vectorizer
    vectorizer = CountVectorizer(
        analyzer='word',
        lowercase=True,
    )
    # Train the model
    features = vectorizer.fit_transform(train.quote.values)
    features_nd = features.toarray()

    model = GaussianNB()
    model.fit(features_nd, train.fresh.values)

    # Save the model
    pickle.dump(model, open("movie_model.pkl", 'wb'))
    pickle.dump(vectorizer, open("vectorizer.pkl", 'wb'))

    # sample = ["This is a bad movie"]
    # tr = vectorizer.transform(sample)
    # print(model.predict(tr.toarray()))


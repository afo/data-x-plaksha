# Use the Jupyter Tensorflow notebook as the base image
FROM jupyter/tensorflow-notebook

LABEL maintainer="Alexander Fred-Ojala <afo@berkeley.edu>"

# Switch to root
USER root

# Jupyter listens port: 8888, 8889 ... Tensorboard 6006
EXPOSE 8888 8889 6006

# Install vim

RUN apt-get update && apt-get -yq dist-upgrade \
 && apt-get install -yq --no-install-recommends \
    vim \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*


# Switch to Joyvan
USER $NB_UID

# GCC is needed for XGBoost
RUN conda install --quiet --yes \
    'opencv=3.4.1' \
    'flask' \
    'plotly=3.1*' \
    'gcc' && \
    conda clean -tipsy && \
    fix-permissions $CONDA_DIR && \
    fix-permissions /home/$NB_USER


RUN pip install xgboost

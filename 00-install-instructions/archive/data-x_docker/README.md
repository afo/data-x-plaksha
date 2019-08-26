# Run Data-X notebooks in a Docker container

A Docker container is a lightweight, standalone, executable package of software / virtualization of an operating system that includes everything needed to run an application or a set of project files.

**Pros:** Docker is a fantastic tool if you don't want to install dependencies, packages, libraries on your local machine. Or if you want to make sure that everyone in a group or team is running the same "machine" with the same operating system and software installed.

## Docker install instructions

* [OSX](https://docs.docker.com/docker-for-mac/install/)
* [Windows](https://docs.docker.com/docker-for-windows/install/)
* [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
* [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/)

## Run the Docker image

1. To see if Docker works open a Terminal / Command Prompt and run `docker run hello-world` . If that command works, you're good to go.
2. Run the command `docker run -p 8888:8888 alexfo/data-x` to start a Docker container from the data-x image.
3. Open a browser and navigate to: `localhost:8888/?token=[INPUT TOKEN]`, where the token is displayed in the Terminal output. 

Congratulations! Now you're running a Jupyter notebook in a Docker container that is a virtualization of an Unix based system with all the Data science packages of your (Data-X) needs.

## Helpful tips and tricks

### Copy files to and from the host machine

Note that everytime you shutdown the container all the work you've done will be removed. Therefore, I recommend that you do one of the following in order to save and backup your work.

#### Manual procedure

1. Find your Docker container ID by running `docker ps`
2. To copy files from your host machine to the container run: `docker cp [SRC_PATH] [CONTAINER_ID]:[DEST_PATH]`
3. To copy files from your container to your local machine: `docker cp [CONTAINER_ID]:/[SRC_PATH] [DEST_PATH]`

**Example:** Your container home folder is located at `/home/jovyan/work` . So to copy a file in your current Terminal folder called `hi.txt` to the container you'd run:

``docker cp hi.txt [CONTAINER_ID]:/home/jovyan/work/``

Note that you can also copy folders to your container. See more at [https://docs.docker.com/engine/reference/commandline/cp/](https://docs.docker.com/engine/reference/commandline/cp/)

#### Share folder with container and host

With Docker you're also able to share a local folder with your container. However, in order for all the permissions to be correct we need to run a slightly more complicated Docker command when we run the container.

To share a folder called `data-x` in our local home directory with the contianer, then when we launch the container we should run:

``docker run -p 8888:8888 -v $HOME/data-x:/home/jovyan/work/ alexfo/data-x``

Please note that you might need to change `$HOME` if you're running Windows.


## Run JupyterLab

You can also run Jupyter Lab instead of Jupyter Notebook, to do this pass the option flag `-e JUPYTER_ENABLE_LAB=yes`, e.g.:

``docker run -p 8888:8888 -e JUPYTER_ENABLE_LAB=yes alexfo/data-x``


### Open port for Tensorboard

To be able to access a Tensorboard instance running in your container you have to open the port 6006, you can do that with

docker run -p 8888:8888 -p 6006:6006 alexfo/data-x

Note that after the `-p` flag you specify `[HOST_PORT]:[CONTAINER_PORT]`, the only ports Exposed in the container are 6006, 8888, and 8889. The choice of `[HOST_PORT]` is arbitrary (standards are chosen in the examples.


### Install additional packages

If you're running a notebook and you find that you're missing a package you need you can install it directly from Jupyter by creating a cell and running:

``!conda install -y [PACKAGE_NAME]``

If conda (or any of it's repositories like conda-forge or menpo doesn't have the package try pip):

``!pip install [PACKAGE_NAME]``

You can also connect to the container and run bash commands, to do this find the container ID by running the Terminal commmand `docker ps`, then let the container still run (don't stop the notebook), and open a new Terminal window and run:

``docker exec -it [CONTAINER_ID] bash``

This way you'll connect to the instance and you can install packages through apt-get, conda or pip.


## Stop and remove the container

To stop the container after you've stopped the running notebook instance, find the container ID with `docker ps`, then run:

``docker stop [CONTAINER_ID]``

If you also want to remove the Container you have to run:

``docker rm [CONTAINER_ID]``

If you want to skip the last step (with `docker rm`), then when you launch the container you can pass the flag `--rm`, this will automatically delete the instace, e.g.:

``docker run --rm -p 8888:8888 alexfo/data-x``



### Remove Docker image from harddrive

Since this image occupies a lot of space on the hard drive, when you're done with it you can remove it by first finding it's IMAGE_ID (by running `docker image`). Then run:

``docker rmi [IMAGE_ID]`` to permanently delete the image.


### Resources and thanks

To be written

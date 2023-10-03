## Node.js / Git

# Estudos sobre nodejs e git


Compilação de comandos em Git, retirado do livro abaixo:

https://github.com/free-educa/books/blob/main/books/Controlando%20vers%C3%B5es%20com%20Git%20e%20GitHub%20-%20Casa%20do%20Codigo.pdf


# Git stylesheet:

add all files in stage:
git add .


commit and add files:
git commit -am 


---------------------------


add a repository in remote server:
git init --bare <repository>.git


add a remote repository link:
git remote add <remote> <link>.git


view remotes repositories:
git remote -v


rename remote:
git remote rename <remote> <new_name>


change link remote:
git remote set-url <remote> <new_link>


---------------------------


view all branchs local/remote:
git branch -v


create new branch:
git branch <branch>


change to branch:
git checkout <branch>


create and change to branch:
git checkout -b <branch>


remove branch:
git branch -d <branch>


---------------------------


( -- ) indentify are a file, not branch 

recovery branchs not staged, without commit
git checkout -- <file>
git checkout (use again to recovery)


remove changes from stage, but keep local:
git reset -- <file>


remove changes in stage and local:
git reset --hard


revert changes to a commit:
git revert --no-edit <code>


remove and move files:
git rm <file>
git mv <file> <path>


---------------------------


last 3 commits:
git log -n 3 --oneline --decorate --parents


search commit from code:
git log -n 1 --oneline <code>


---------------------------


view commits changes:
git diff --staged
git diff <code>
git diff HEAD (last commit)


when you type diff command, use:
( : ) "enter" to view more, "q" to exit


difference between commits
git diff <commit1>..<commit2>
git diff <code>~2    (last 2 commits)


---------------------------


Fetch, get branchs from remote repo:
git fetch <remote>


use remote branchs:
git fetch <remote>
git checkout -t <remote>/<branch>
git push <remote> <branch> 

git pull --rebase <remote> <branch> 

is a shortcut:
git checkout master
git pull <remote> master
git checkout <branch>
git rebase master 

pull sem rebase
git checkout master
git pull <remote> master
git merge <branch>



local:
<remote>
*origin 

remote:
<remote>/<remote_branch>
*origin/master


merge files in remote with local:
git pull --rebase <remote> <branch> 

is a shortcut for:
git fetch <remote>
git checkout <main>
git merge <branch> -m "msg"


---------------------------


View branchs for merge:
git branch --no-merged


Merge branchs: select *master to merge <branch> in master 

git checkout <master>
git merge <branch> -m "merge"
merged <branch> in *master


---------------------------


Tag is a photo of code, for find bugs in future
is used like:   v1.0  v1.1  v2.0  ...


create a new tag:
git tag <tag_name>


view tags:
git tag


create a tag for a commit:
git tag <tag_name> <commit_code>


remove a tag:
git tag -d <tag_name>


anoted tags, keep informations in tag:
git tag -a <tag_name> -m "msg"


show tag informations:
git show -s <tag_name>


push tags:
git push <remote> <tag_name>


push all tags:
git push <remote> --tags
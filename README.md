# CPU-Simulator
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/TheWolfBadger/CPU-Simulator/blob/master/LICENSE)

CPU-Simulator was a program designed to show how the CPU works through jobs using the different
scheduling algorithms available. The program was made for Sister Jane's COM 310 Operating Systems assignment #1.
# Site
https://thewolfbadger.github.io/CPU-Simulator/
# Algorithms Included:
## First Come First Served
"First Come First served" CPU scheduling algorithm works like its name the first the job arrive to the ready queue the first it will be processed by the CPU.
## Non-Preemptive Priority
"Non-Preemptive Priority" works just like "First Come First Served" algorithm except that the jobs in the ready queue are ordered by priority.
## Preemptive Priority
"Preemptive Priority" works like the "Shortest Remaining Time First" algorithm except that the jobs in the ready queue are ordered by priority. A job which is currently being processed by the CPU can be replaced for a job with a higher priority.
## Round Robin
The "Round Robin" algorithm lets every job be processed by the CPU for a certain time "quantum time" then replaces it with the next job in the ready queue. When a job finishes it's quantum time it gets sent to the end of the ready queue.
## Shortest Job First
The "Shortest Job First" algorithm is the same as "First Come First Served" except that the ready queue is reordered by shortest burst time job every time a new job arrives. "Shortest Job First" is a non-preemptive algorithm. 

\[Impossible to implement in interactive systems where required CPU time is not known]
## Shortest Remaining Time First
"Shortest Time Remaining First" is the same as "Shortest Job First" except it orders the jobs in the ready queue by the shortest remaining time including the job that is getting processed by the CPU. A job in the ready queue will replace the job which is being currently processed by the CPU if it has a shorter remaining time. "Shortest Time Remaining First" is a preemptive algorithm.

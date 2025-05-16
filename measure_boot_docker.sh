#!/bin/bash
# enter image name as necessary
measure_boot(){
        start=$(date +%s%N)
        docker run -d -m 2g --cpuset-cpus="1" -p 3000:3000 benchmark_v10:latest
        end=$(date +%s%N)
        time=$((end - start))
        echo "boot time: $time"
        docker kill $(docker ps -q)
}

for (( i = 1; i <=100; i++));
do
        measure_boot >> boottime_docker.txt
done


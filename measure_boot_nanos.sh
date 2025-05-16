#!/bin/bash

measure_boot(){
        start=$(date +%s%N)
        ops pkg load eyberg/node:20.5.0 -p 3000 -c config.json & nano_pid=$!
        end=$(date +%s%N)
        time=$((end - start))
        echo "boot time: $time"
        kill -SIGTERM $nano_pid
}

for(( i = 1; i<=100;i++))
do
        measure_boot >> boottime_nanos.txt
done




import { Injectable } from '@nestjs/common';
import {createClient} from 'redis';

@Injectable()
export class RedisService {
        redisUrl = 'redis://localhost:6379';
        redisPort = 6379;
        redisClient;

    constructor() {
        this.redisClient = createClient({
            url: this.redisUrl,
            password: 'redisroot'
        });
        this.connectRedis();
    }

    async connectRedis() {
        try {
            await this.redisClient.connect();
            console.log('Redis client connected');
        } catch (err: any) {
            console.log(err.message);
        }
    };

    async setPair(key: string, value: string) {
        this.redisClient.set(key, value);
    }
}
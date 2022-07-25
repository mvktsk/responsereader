# Get response from servers

## Task description

We have a 3 servers:  "maria.ru", "rose.ru", "sina.ru". Each one have `api/count` GET method with `{"count": 42}` body response.

Should create a script that will get response from all servers every whole minute and print it to the console.

Output should look like this:

```
2022-05-20 13:01:00 maria.ru 42
2022-05-20 13:01:00 rose.ru 43
2022-05-20 13:01:00 sina.ru 45
2022-05-20 13:02:00 maria.ru 32
2022-05-20 13:02:00 rose.ru 33
2022-05-20 13:02:00 sina.ru 34
```

## Solution

Create a loop that will request servers asynchronously every minute.

## How to run

Prerequisites: Node 14 and above should be installed

- Clone repository locally.
- Navigate to the directory with the script.
- Install dependencies: `npm install`.
- Run the script: `node --loader ts-node/esm .\src\index.ts`

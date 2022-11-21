# region one
# import asyncio


# async def main():
#     await asyncio.sleep(1)

#     print('hello')

# asyncio.run(main())
# endregion one

# region two
# import asyncio


# async def coro():
#     print('hello')
#     await asyncio.sleep(1)
#     print('world')

# loop = asyncio.get_event_loop()
# task = loop.create_task(coro())
# loop.run_until_complete(task)


# endregion two
# region 取消task的範例
# import asyncio


# async def cancel_me():
#     print('cancel_me(): sleep')
#     try:
#         # wait for 1 hour
#         await asyncio.sleep(3600)
#     except:
#         print('cancel_me(): cancel sleep')
#         raise
#     finally:
#         print('cancel_me(): after sleep')


# async def main():
#     print('main():running')
#     # create a "cancel_me" task
#     task = asyncio.create_task(cancel_me())

#     # wati for 5 second
#     print('main():sleep')
#     await asyncio.sleep(5)

#     print('main(): call cancel')
#     task.cancel()
#     try:
#         await task
#     except asyncio.CancelledError:
#         print('main(): cancel_me is cancelled now')

# asyncio.run(main())

# endregion 取消task的範例
# region 沒有 await task的範例
import asyncio


async def cancel_me():
    print('cancel_me(): sleep')
    for i in range(1, 101):
        print('cancel_me(): print ', i)
        if i % 10 == 0:
            await asyncio.sleep(2)


async def main():
    print('main(): running')
    # create a 'cancel_me' task
    task = asyncio.create_task(cancel_me())

    # wati for 60 second
    print('main():sleep')
    await asyncio.sleep(60)

asyncio.run(main())
# endregion 沒有 await task的範例

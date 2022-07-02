import { setupWorker, rest } from 'msw'
import { BASE_URL } from '@/utils/url'
import { faker } from '@faker-js/faker'

// 1.创建一个用于做拦截请求工作的人
export const worker = setupWorker(
    // 2.定义拦截请求程序
    /*
     * 通过 rest 提供的方法拦截 xxx 请求
     * 第一个参数表示要拦截的请求地址
     * 第二个参数是请求处理程序: req\res\ctx
     * */
    rest.get(`${BASE_URL}/message`, (req, res, ctx) => {
        return res(
            ctx.json(
                // 生成模拟数据
                generateMockData(5, () => ({
                    name: faker.name.firstName(),
                    avater: faker.internet.avatar(),
                    phone: faker.phone.number(),
                    cityName: faker.address.cityName(),
                    email: faker.internet.email(),
                }))
            )
        )
    })
)

//#region Faker 批量生成数据方法
function generateMockData(length = 10, generate) {
    return Array.from({ length }, generate)
}
//#endregion
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data:[
                {name:"Computer Science"},
                {name:"Music"},
                {name:"Business"},
                {name:"Accounting"},
                {name:"Photography"},
                {name:"Engineering"},
                {name:"Filming"},
            ]

        });
        console.info("Success")
    } catch (error) {
        console.error("Error seeding the database categories",error);
    }finally{
        await db.$disconnect
    }
}

main();
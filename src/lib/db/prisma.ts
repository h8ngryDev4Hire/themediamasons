import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default prisma


// LEGACY
//async function main() {
//	const client = await prisma.clientContact.delete({
//		where: {
//			email: 'johnjay@johnjayauto.com',
//			id: 1
//		}
//	})
//}



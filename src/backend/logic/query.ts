import { ValueDate } from "@/shared/enums/note/date";

export function query(userId: string, segment: string): object {
    if (!segment) return { userId: userId };

    const criteria = JSON.parse(segment);

    let date: { $gte?: string, $lt?: string } | undefined = {};

    const startDay = (date: Date): string => {
        date.setHours(0, 0, 0, 0);
        return date.toISOString();
    }

    const endDay = (date: Date): string => {
        date.setHours(23, 59, 59, 999);
        return date.toISOString();
    }

    let currentDate: Date = new Date();

    switch (criteria.dates) {
        case ValueDate.TODAY:
            date['$gte'] = startDay(new Date());
            date['$lt'] = endDay(new Date());
            break;
        case ValueDate.YESTERDAY:
            currentDate.setDate(currentDate.getDate() - 1);
            date['$gte'] = startDay(new Date(currentDate));
            date['$lt'] = endDay(new Date(currentDate));
            break;
        case ValueDate.AGO_7_DAYS:
            currentDate.setDate(currentDate.getDate() - 7);
            date['$gte'] = startDay(new Date(currentDate));
            date['$lt'] = endDay(new Date());
            break;
        case ValueDate.AGO_1_MONTH:
            currentDate.setMonth(currentDate.getMonth() - 1);
            date['$gte'] = startDay(new Date(currentDate));
            date['$lt'] = endDay(new Date());
            break;
    }

    return {
        userId: userId,
        ...(criteria?.title && { title: { $regex: `(?i)^${criteria?.title}` } }),
        ...(criteria?.category?.title && { 'category.title': criteria?.category?.title }),
        ...(criteria?.priority && { priority: criteria?.priority }),
        ...(criteria?.dates && { createdAt: date }),
        ...(criteria?.featured && { featured: criteria?.featured })
    }
}
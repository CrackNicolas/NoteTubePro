export function Query(user_id: string, segment: string): object {
    if (!segment) return { user_id: user_id };

    const criteria = JSON.parse(segment);

    let date: { $gte?: string, $lt?: string } | undefined = {};

    const start_day = (date: Date): string => {
        date.setHours(0, 0, 0, 0);
        return date.toISOString();
    }

    const end_day = (date: Date): string => {
        date.setHours(23, 59, 59, 999);
        return date.toISOString();
    }

    let current_date = new Date();

    switch (criteria.dates) {
        case 'Hoy':
            date['$gte'] = start_day(new Date());
            date['$lt'] = end_day(new Date());
            break;
        case 'Ayer':
            current_date.setDate(current_date.getDate() - 1);
            date['$gte'] = start_day(new Date(current_date));
            date['$lt'] = end_day(new Date(current_date));
            break;
        case 'Hace 7 dias':
            current_date.setDate(current_date.getDate() - 7);
            date['$gte'] = start_day(new Date(current_date));
            date['$lt'] = end_day(new Date());
            break;
        case 'Hace 1 mes':
            current_date.setMonth(current_date.getMonth() - 1);
            date['$gte'] = start_day(new Date(current_date));
            date['$lt'] = end_day(new Date());
            break;
    }

    return {
        user_id: user_id,
        ...(criteria?.title && { title: { $regex: `(?i)^${criteria?.title}` } }),
        ...(criteria?.category?.title && { 'category.title': criteria?.category?.title }),
        ...(criteria?.priority && { priority: criteria?.priority }),
        ...(criteria?.dates && { createdAt: date }),
        ...(criteria?.featured && { featured: criteria?.featured })
    }
}
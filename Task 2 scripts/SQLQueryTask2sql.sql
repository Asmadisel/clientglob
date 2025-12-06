DECLARE @collab_id INT = 710253;
DECLARE @collab_name NVARCHAR (100) = 'Сотрудник 1';
DECLARE @collab_max_age INT = 40;

--рекурсивная таблица, уровень 0 - подразделение “Сотрудник 1” с id 710253
WITH SubdivisionsLeveling AS (
	SELECT 
        s.id,
        s.name,
        s.parent_id,
        0 AS level
    FROM subdivisions s
    WHERE s.id = (
        SELECT subdivision_id 
        FROM collaborators 
        WHERE id = @collab_id AND name = @collab_name
    )

    --Объединяем всё
    UNION ALL

    --Вызов в иерархии
    SELECT 
        s.id,
        s.name,
        s.parent_id,
        st.level + 1 AS level  
    FROM subdivisions s
    INNER JOIN SubdivisionsLeveling st ON s.parent_id = st.id
    --Не Not in, а диапазон.
    WHERE s.id NOT BETWEEN 100055 AND 100059 
)

--Основной запрос: присоединяем таблицу сотрудников к нашей рекурсии.
SELECT 
    c.id AS collaborator_id,
    c.name AS collaborator_name,
    c.age,
    sl.id AS subdivision_id,
    sl.name AS subdivision_name,
    sl.level
FROM SubdivisionsLeveling sl
INNER JOIN collaborators c ON sl.id = c.subdivision_id
--Возраст.
WHERE c.age < @collab_max_age
ORDER BY sl.level ASC;

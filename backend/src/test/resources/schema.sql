
-- 회원 테이블
create TABLE member (
	id bigint PRIMARY KEY AUTO_INCREMENT,
    login_id varchar(255) NOT NULL UNIQUE,
	member_name varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    birth datetime NOT NULL,
    nickname varchar(255) NOT NULL UNIQUE,
    auth varchar(255) NOT NULL DEFAULT 'ROLE_USER',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 게시글 테이블
create TABLE post (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	title varchar(255) NOT NULL,
	content text NOT NULL,
    views int NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_edited boolean DEFAULT false,
    member_id bigint,
    foreign key (member_id) references member(id)
);

-- 댓글 테이블
create TABLE comments (
	id bigint PRIMARY KEY AUTO_INCREMENT,
    parent_id bigint default null,
	content text NOT NULL,
    is_deleted boolean default false,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    member_id bigint,
    post_id bigint NOT NULL,
    depth INT default 0,
    is_edited boolean DEFAULT false,
	foreign key (parent_id) references comments(id),
    foreign key (member_id) references member(id),
    foreign key (post_id) references post(id)
);

-- 글-좋아요 테이블
create TABLE post_reaction (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	member_id bigint,
    post_id bigint,
	type enum('LIKE','DISLIKE') NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (member_id) references member(id),
    foreign key (post_id) references post(id)
);



import { extendType, nonNull, objectType, stringArg, intArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("description");
    t.nonNull.string("url");
  },
});

let links: NexusGenObjects["Link"][] = [
  {
    id: 1,
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
  {
    id: 2,
    url: "graphql.org",
    description: "GraphQL official website",
  },
];

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      type: "Link",
      resolve() {
        return links;
      },
    });
  },
});

export const SingleLink = extendType({
  type: "Query",
  definition(t) {
    t.field("findLink", {
      type: "Link",
      args: {
        id: intArg(),
      },
      resolve(_, args, __, ___) {
        const { id } = args;
        return links.find((item) => item.id === id!) || null;
      },
    });
  },
});

export const LinkMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("post", {
      type: "Link",
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve(_, args, __) {
        const { description, url } = args;
        let idCount = links.length + 1;
        const link = {
          id: idCount,
          description,
          url,
        };
        links.push(link);
        return link;
      },
    });
  },
});

export const UpdateLink = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateLink", {
      type: "Link",
      args: {
        id: nonNull(intArg()),
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve(__, args) {
        const { id, description, url } = args;
        const item = links.find((v) => v.id === id);
        if (item) {
          item.description = description;
          item.url = url;
          return item;
        }
        return null;
      },
    });
  },
});

export const DeleteLink = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.list.field("deleteLink", {
      type: "Link",
      args: {
        id: nonNull(intArg()),
      },
      resolve(_, args, __) {
        const { id } = args;
        links = links.filter((item) => item.id !== id);
        return links;
      },
    });
  },
});

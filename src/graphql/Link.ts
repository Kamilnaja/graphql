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

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      type: "Link",
      resolve(_, __, context) {
        return context.prisma.link.findMany();
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
        id: nonNull(intArg()),
      },
      resolve(_, args, context) {
        const { id } = args;
        const res = context.prisma.link.findFirst({
          where: {
            id,
          },
        });
        return res;
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
      resolve(_, args, context) {
        const { description, url } = args;
        const newLink = context.prisma.link.create({
          data: {
            description,
            url,
          },
        });
        return newLink;
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
      resolve(__, args, context) {
        const { id, description, url } = args;
        const item = context.prisma.link.update({
          where: {
            id,
          },
          data: {
            description,
            url,
          },
        });
        return item;
      },
    });
  },
});

export const DeleteLink = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.list.field("deleteLink", {
      type: "ID",
      args: {
        id: nonNull(intArg()),
      },
      resolve(_, args, context) {
        let allData;
        const { id } = args;
        const item = context.prisma.link.delete({
          where: {
            id,
          },
        });
        return item;
      },
    });
  },
});

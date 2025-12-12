import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string): void {
    registerDecorator({
      name: 'Match',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: unknown, args: ValidationArguments): boolean {
          const [relatedProperty] = args.constraints;
          const relatedValue = (args.object as any)[relatedProperty];
          return value === relatedValue;
        },

        defaultMessage(args: ValidationArguments): string {
          const [relatedProperty] = args.constraints;
          return `${args.property} no coincide con ${relatedProperty}`;
        },
      },
    });
  };
}
